<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\Registration;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;

class RegistrationController extends Controller
{
    public function index()
{
    // Include the 'schedule' relationship when fetching registrations
    $registrations = Registration::withTrashed()->with('schedule')->get();

    return response()->json(['registrations' => $registrations], 200);
}


    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'fname' => 'required|string|max:255',
            'lname' => 'required|string|max:255',
            'mname' => 'nullable|string|max:255',
            'pref' => 'nullable|string|max:255',
            'age' => 'nullable|integer',
            'monthoption' => 'nullable|string|max:255',
            'date' => 'nullable|integer',
            'year' => 'nullable|integer',
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
            'selectcourse' => 'nullable|string|max:255',
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

        $registration = Registration::create($validatedData);

        if ($request->hasFile('fileinput')) {
            foreach ($request->file('fileinput') as $file) {
                $path = Storage::put('registrations', $file);
                $url = Storage::url($path);
                $registration->images()->create(['path' => $url]);
            }
        }

        return response()->json(['message' => 'Registration successful', 'reference_number' => $registration->reference_number], 201);
    }

    private function determineScheduleId()
    {
        $registrationsPerSchedule = Registration::select('schedule_id', DB::raw('count(*) as count'))
            ->groupBy('schedule_id')
            ->get()
            ->pluck('count', 'schedule_id')
            ->toArray();

        foreach ($registrationsPerSchedule as $scheduleId => $count) {
            if ($count < 2) {
                return $scheduleId;
            }
        }

        $lastScheduleId = array_key_last($registrationsPerSchedule);
        return $lastScheduleId ? $lastScheduleId + 1 : 1;
    }

    public function show($id)
    {
        $registration = Registration::with(['schedule' => function ($query) {
            $query->withTrashed();
        }])->findOrFail($id);
    
        return response()->json(['registration' => $registration], 200);
    }

    public function update(AdmissionFormRequest $request, $id)
    {
        $registration = Registration::findOrFail($id);
        $validatedData = $request->validated();
        $registration->update($validatedData);
        return response()->json(['message' => 'Registration updated successfully', 'data' => $registration], 200);
    }

    public function destroy($id)
{
    $registration = Registration::findOrFail($id);
    $registration->delete();
    return response()->json(['message' => 'Registration deleted successfully'], 200);
}
}
