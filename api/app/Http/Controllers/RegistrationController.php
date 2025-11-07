<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\ActivityLog;
use App\Models\Registration;
use App\Models\Schedule;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class RegistrationController extends Controller
{
    public function index()
{
    $registrations = Registration::withTrashed()
        ->with('schedule')
        ->with('images')
        ->get();

    $courseCounts = Registration::withTrashed()
        ->select('courseId', DB::raw('count(*) as count'))
        ->groupBy('courseId')
        ->pluck('count', 'courseId');

    return response()->json([
        'registrations' => $registrations,
        'course_counts' => $courseCounts,
    ], 200);
}



    public function store(Request $request)
    {
        $validatedData = $request->validate($this->validationRules());

        $validatedData = $this->prepareRegistrationPayload($request, $validatedData);
        unset($validatedData['psa_certificate'], $validatedData['marriage_certificate']);

        $scheduleId = $this->determineScheduleId($validatedData['courseId']);
        $validatedData['schedule_id'] = $scheduleId;

        $documentPaths = $this->handleDocumentUploads($request);

        $registration = Registration::create(array_merge($validatedData, $documentPaths));

        if ($request->hasFile('fileinput')) {
            foreach ($request->file('fileinput') as $file) {
                $path = $file->store('registrations', 'public');
                $registration->images()->create(['path' => $path]);
            }
        }

        return response()->json([
            'message' => 'Registration successful',
            'reference_number' => $registration->reference_number,
        ], 201);
    }

    private function determineScheduleId($courseId)
    {
        // Get the list of schedules and their current registration counts
        $registrationsPerSchedule = Registration::select('schedule_id', DB::raw('count(*) as count'))
            ->groupBy('schedule_id')
            ->get()
            ->pluck('count', 'schedule_id')
            ->toArray();

        // Fetch all schedules ordered by their ID
        $schedules = Schedule::orderBy('id')->get();

        foreach ($schedules as $schedule) {
            // If schedule has allowed_courses set, ensure course is permitted
            if (!empty($schedule->allowed_courses) && is_array($schedule->allowed_courses)) {
                if (!in_array($courseId, $schedule->allowed_courses)) {
                    continue;
                }
            }
            // Get current registration count for this schedule
            $currentCount = $registrationsPerSchedule[$schedule->id] ?? 0;

            // Check if this schedule can accommodate more registrations
            if ($currentCount < $schedule->max_registrations) {
                return $schedule->id;
            }
        }
    
        // If all schedules are full, handle the logic here (e.g., return an error or a specific value)
        throw new \Exception('All schedules are full.');
    }

    private function validationRules(bool $requireFiles = true): array
    {
        $rules = [
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'mname' => 'nullable|string|max:255',
            'pref' => 'nullable|string|max:255',
            'monthoption' => 'nullable|string|max:255',
            'date' => 'nullable|integer',
            'year' => 'nullable|integer',
            'birthdate' => 'required|date',
            'age' => 'nullable|integer',
            'sex' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:255',
            'civilstatus' => 'nullable|string|max:255',
            'contactnumber' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'pbirth' => 'nullable|string|max:255',
            'indigentP' => 'nullable|string|max:255',
            'indigentPy' => 'nullable|string|max:255',
            'pbs' => 'nullable|string|max:255',
            'home_address' => 'required|string|max:255',
            'present_address' => 'required|string|max:255',
            'district' => 'nullable|string|max:255',
            'barangay' => 'nullable|string|max:255',
            'cityM' => 'nullable|string|max:255',
            'province' => 'nullable|string|max:255',
            'Zcode' => 'nullable|integer',
            'familyB' => 'nullable|string|max:255',
            'sincewhen' => 'nullable|string|max:255',
            'Nsibling' => 'nullable|string|max:255',
            'supstudy' => 'nullable|string|max:255',
            'ofw' => 'nullable|string|max:255',
            'ofwprofession' => 'nullable|string|max:255',
            'studenttype' => 'required|string|max:255',
            'Nwork' => 'nullable|string|max:255',
            'StudentCat' => 'nullable|string|max:255',
            'semester' => 'nullable|string|max:255',
            'academic_year_start' => 'nullable|string|max:255',
            'academic_year_end' => 'nullable|string|max:255',
            'application_date' => 'nullable|date',
            'pwd' => 'nullable',
            'year_graduated' => 'nullable|string|max:255',
            'senior_high_track' => 'nullable|string|max:255',
            'strand' => 'nullable|string|max:255',
            'lrn' => 'nullable|string|max:255',
            'gpa' => 'nullable|string|max:255',
            'father_name' => 'required|string|max:255',
            'mother_maiden_name' => 'required|string|max:255',
            'family_members' => 'nullable|array',
            'family_members.*.name' => 'nullable|string|max:255',
            'family_members.*.relationship' => 'nullable|string|max:255',
            'family_members.*.age' => 'nullable|string|max:255',
            'family_members.*.mobile' => 'nullable|string|max:255',
            'family_members.*.education' => 'nullable|string|max:255',
            'family_members.*.occupation' => 'nullable|string|max:255',
            'family_members.*.income' => 'nullable|string|max:255',
            'dswd_member' => 'nullable',
            'dswd_member_details' => 'nullable|string|max:255',
            'social_assistance_beneficiary' => 'nullable',
            'social_assistance_details' => 'nullable|string|max:255',
            'total_monthly_income' => 'nullable|string|max:255',
            'F_nameSchool' => 'nullable|string|max:255',
            'F_Atrack' => 'nullable|string|max:255',
            'F_AMprovince' => 'nullable|string|max:255',
            'F_Ygrad' => 'nullable|string|max:255',
            'T_nameSchool' => 'nullable|string|max:255',
            'T_Atrack' => 'nullable|string|max:255',
            'T_AMprovince' => 'nullable|string|max:255',
            'T_Ygrad' => 'nullable|string|max:255',
            'courseId' => 'required|exists:courses,id',
        ];

        $rules['fileinput'] = $requireFiles ? 'required|array' : 'nullable|array';
        $rules['fileinput.*'] = [
            $requireFiles ? 'required' : 'nullable',
            'image',
            'mimes:jpeg,png,jpg',
            'max:2048',
        ];
        $rules['psa_certificate'] = [
            'nullable',
            'file',
            'mimes:pdf,jpeg,png,jpg',
            'max:4096',
        ];
        $rules['marriage_certificate'] = [
            'nullable',
            'file',
            'mimes:pdf,jpeg,png,jpg',
            'max:4096',
        ];

        return $rules;
    }

    private function prepareRegistrationPayload(Request $request, array $validatedData): array
    {
        $birthdateInput = $validatedData['birthdate'] ?? $request->input('birthdate');

        if ($birthdateInput) {
            $birthDate = Carbon::parse($birthdateInput);
            $validatedData['birthdate'] = $birthDate;
            $validatedData['monthoption'] = strtolower($birthDate->format('F'));
            $validatedData['date'] = (int) $birthDate->format('d');
            $validatedData['year'] = (int) $birthDate->format('Y');
            $validatedData['age'] = $birthDate->age;
        } else {
            $validatedData['age'] = $this->calculateAgeFromParts(
                $validatedData['monthoption'] ?? null,
                $validatedData['date'] ?? null,
                $validatedData['year'] ?? null
            );
        }

        $validatedData['application_date'] = isset($validatedData['application_date'])
            ? Carbon::parse($validatedData['application_date'])
            : now();

        foreach (['pwd', 'dswd_member', 'social_assistance_beneficiary'] as $field) {
            if (array_key_exists($field, $validatedData)) {
                $validatedData[$field] = $this->normalizeBoolean($validatedData[$field]);
            }
        }

        if (isset($validatedData['family_members']) && is_array($validatedData['family_members'])) {
            $validatedData['family_members'] = array_values(array_filter(
                array_map(function ($member) {
                    if (!is_array($member)) {
                        return null;
                    }

                    $cleaned = [];
                    foreach ($member as $key => $value) {
                        $cleaned[$key] = is_string($value) ? trim($value) : $value;
                    }

                    foreach ($cleaned as $value) {
                        if ($value !== null && $value !== '') {
                            return $cleaned;
                        }
                    }

                    return null;
                }, $validatedData['family_members'])
            ));
        }

        return $validatedData;
    }

    private function normalizeBoolean($value): ?bool
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_bool($value)) {
            return $value;
        }

        $value = strtolower((string) $value);

        if (in_array($value, ['1', 'true', 'yes', 'y'], true)) {
            return true;
        }

        if (in_array($value, ['0', 'false', 'no', 'n'], true)) {
            return false;
        }

        return null;
    }

    private function calculateAgeFromParts(?string $month, ?int $day, ?int $year): ?int
    {
        if (!$month || !$year) {
            return null;
        }

        if (is_numeric($month)) {
            $monthNumber = (int) $month;
        } else {
            $timestamp = strtotime($month);
            if ($timestamp === false) {
                return null;
            }
            $monthNumber = (int) date('n', $timestamp);
        }
        $day = $day ?: 1;

        try {
            $birthDate = Carbon::createFromDate($year, $monthNumber, $day);
        } catch (\Exception $e) {
            return null;
        }

        return $birthDate->age;
    }

    private function handleDocumentUploads(Request $request, ?Registration $registration = null): array
    {
        $paths = [];

        if ($request->hasFile('psa_certificate')) {
            if ($registration && $registration->psa_certificate_path) {
                Storage::disk('public')->delete($registration->psa_certificate_path);
            }
            $paths['psa_certificate_path'] = $request->file('psa_certificate')->store('registrations/documents', 'public');
        }

        if ($request->hasFile('marriage_certificate')) {
            if ($registration && $registration->marriage_certificate_path) {
                Storage::disk('public')->delete($registration->marriage_certificate_path);
            }
            $paths['marriage_certificate_path'] = $request->file('marriage_certificate')->store('registrations/documents', 'public');
        }

        return $paths;
    }



    public function show($id)
    {
        $registration = Registration::with(['schedule' => function ($query) {
            $query->withTrashed();
        }])->findOrFail($id);

        ActivityLog::create([
            'user_id' => Auth::check() ? Auth::id() : null, // Handle unauthenticated users
            'username' => Auth::check() ? Auth::user()->username : 'Unknown',
            'action' => 'Viewed registration with ID: ' . $id,
            'data' => json_encode($registration),
        ]);
    
        return response()->json(['registration' => $registration], 200);
    }

    public function update(Request $request, string $id)
    {
        $registration = Registration::findOrFail($id);

        $validatedData = $request->validate($this->validationRules(false));
        $validatedData = $this->prepareRegistrationPayload($request, $validatedData);
        unset($validatedData['psa_certificate'], $validatedData['marriage_certificate']);
        $documentPaths = $this->handleDocumentUploads($request, $registration);
        $validatedData = array_merge($validatedData, $documentPaths);

        // Update schedule_id if provided
        if (isset($validatedData['schedule_id'])) {
            $registration->schedule_id = $validatedData['schedule_id'];
            unset($validatedData['schedule_id']);
        }

        // Handle file uploads
        if ($request->hasFile('fileinput')) {
            // Delete old files if needed
            foreach ($registration->images as $image) {
                $relative = ltrim(str_replace('/storage/', '', $image->path), '/');
                Storage::disk('public')->delete($relative);
                $image->delete();
            }

            // Store new files
            foreach ($request->file('fileinput') as $file) {
                $path = $file->store('registrations', 'public');
                $registration->images()->create(['path' => $path]);
            }
            unset($validatedData['fileinput']);
        }

        $registration->update($validatedData);
        ActivityLog::create([
            'user_id' => Auth::check() ? Auth::id() : null, // Handle unauthenticated users
            'username' => Auth::check() ? Auth::user()->username : 'Unknown',
            'action' => 'Updated registration with ID: ' . $id,
            'data' => json_encode([
                // 'old' => $oldData,
                'new' => $validatedData,
            ]),
        ]);
    
        return response()->json(['message' => 'Registration updated successfully', 'data' => $registration], 200);
    }

    public function destroy($id)
{
    $registration = Registration::findOrFail($id);
    
    // Log the deletion activity
    ActivityLog::create([
        'user_id' => Auth::check() ? Auth::id() : null, // Handle unauthenticated users
        'username' => Auth::check() ? Auth::user()->username : 'Unknown',
        'action' => 'Deleted registration with ID: ' . $id,
        'data' => null,
    ]);

    $registration->delete();

    return response()->json(['message' => 'Registration deleted successfully'], 200);
}

};
