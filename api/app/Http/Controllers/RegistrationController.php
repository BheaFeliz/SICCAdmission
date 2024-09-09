<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\ActivityLog;
use App\Models\Registration;
use App\Models\Schedule;
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
        $month = $request->input('monthoption');
        $date = $request->input('date');
        $year = $request->input('year');
        
        if ($month && $date && $year) {
            $birthDate = new \DateTime("$year-$month-$date");
            $today = new \DateTime();
            $age = $today->diff($birthDate)->y; // Compute age in years
        } else {
            $age = null; // Set to null if date details are missing
        }

        $validatedData = $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'mname' => 'nullable|string|max:255',
            'pref' => 'nullable|string|max:255',
            'monthoption' => 'required|string|max:255',
            'date' => 'nullable|integer',
            'year' => 'nullable|integer',
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
            'studenttype' => 'nullable|string|max:255',
            'Nwork' => 'nullable|string|max:255',
            'StudentCat' => 'nullable|string|max:255',
            'F_nameSchool' => 'nullable|string|max:255',
            'F_Atrack' => 'nullable|string|max:255',
            'F_AMprovince' => 'nullable|string|max:255',
            'F_Ygrad' => 'nullable|string|max:255',
            'T_nameSchool' => 'nullable|string|max:255',
            'T_Atrack' => 'nullable|string|max:255',
            'T_AMprovince' => 'nullable|string|max:255',
            'T_Ygrad' => 'nullable|string|max:255',
            'courseId' => 'required|exists:courses,id',
            'fileinput' => 'required|array',
            'fileinput.*' => [
                'required',
                'image',
                'mimes:jpeg,png,jpg',
                'max:2048',
            ],
        ]);

        $scheduleId = $this->determineScheduleId();
        $validatedData['schedule_id'] = $scheduleId;
        $validatedData['age'] = $age;

        $registration = Registration::create($validatedData);

        if ($request->hasFile('fileinput')) {
            foreach ($request->file('fileinput') as $file) {
                $path = $file->store('registrations', 'public');
                $url = Storage::url($path);
                $registration->images()->create(['path' => $url]);
            }
        }

        return response()->json(['message' => 'Registration successful', 'reference_number' => $registration->reference_number], 201);
    }

    private function determineScheduleId()
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

        $validatedData = $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'mname' => 'nullable|string|max:255',
            'pref' => 'nullable|string|max:255',
            'monthoption' => 'required|string|max:255',
            'date' => 'nullable|integer',
            'year' => 'nullable|integer',
            'age' => 'nullable|string',
            'sex' => 'nullable|string|max:255',
            'gender' => 'nullable|string|max:255',
            'civilstatus' => 'nullable|string|max:255',
            'contactnumber' => 'nullable|string|max:255',
            'email' => 'nullable|email|max:255',
            'pbirth' => 'nullable|string|max:255',
            'indigentP' => 'nullable|string|max:255',
            'indigentPy' => 'nullable|string|max:255',
            'pbs' => 'nullable|string|max:255',
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
            'studenttype' => 'nullable|string|max:255',
            'Nwork' => 'nullable|string|max:255',
            'StudentCat' => 'nullable|string|max:255',
            'F_nameSchool' => 'nullable|string|max:255',
            'F_Atrack' => 'nullable|string|max:255',
            'F_AMprovince' => 'nullable|string|max:255',
            'F_Ygrad' => 'nullable|string|max:255',
            'T_nameSchool' => 'nullable|string|max:255',
            'T_Atrack' => 'nullable|string|max:255',
            'T_AMprovince' => 'nullable|string|max:255',
            'T_Ygrad' => 'nullable|string|max:255',
            'courseId' => 'required|exists:courses,id',
            'fileinput' => 'nullable|array',
            'fileinput.*' => [
                'nullable',
                'image',
                'mimes:jpeg,png,jpg',
                'max:2048',
            ],
        ]);

        // Update schedule_id if provided
        if (isset($validatedData['schedule_id'])) {
            $registration->schedule_id = $validatedData['schedule_id'];
            unset($validatedData['schedule_id']);
        }

        // Handle file uploads
        if ($request->hasFile('fileinput')) {
            // Delete old files if needed
            foreach ($registration->images as $image) {
                Storage::disk('public')->delete($image->path);
                $image->delete();
            }

            // Store new files
            foreach ($request->file('fileinput') as $file) {
                $path = $file->store('registrations', 'public');
                $url = Storage::url($path);
                $registration->images()->create(['path' => $url]);
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
