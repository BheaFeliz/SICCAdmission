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
    public function index() {
        $registrations = Registration::all();
        return response()->json(['registrations' => $registrations], 200);
    }

    public function store(Request $request) {
        // Validate the request data
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
                'max:2048', // Adjust max file size as per your requirement
            ],
        ]);

        $scheduleId = $this->determineScheduleId();
        // Add the determined schedule_id to validated data
        $validatedData['schedule_id'] = $scheduleId;

        // Create a new registration instance and save it to get the ID
        $registration = Registration::create($validatedData);

        // Generate the reference number now that the registration has been saved and has an ID
        $referenceNumber = $registration->generateReferenceNumber($scheduleId);
        
        // Update the registration with the reference number
        $registration->reference_number = $referenceNumber;
        $registration->save();
        
        // Handle image uploads
        if ($request->hasFile('fileinput')) {
            foreach ($request->file('fileinput') as $file) {
                $path = Storage::put('registrations', $file);
                $url = Storage::url($path);
                $registration->images()->create(['path' => $url]);
            }
        }

        // Return a response indicating success
        return response()->json(['message' => 'Registration successful', 'reference_number' => $referenceNumber], 201);
    }

    private function determineScheduleId() {
        // Get the count of registrations for each schedule_id
        $registrationsPerSchedule = Registration::select('schedule_id', DB::raw('count(*) as count'))
            ->groupBy('schedule_id')
            ->get()
            ->pluck('count', 'schedule_id')
            ->toArray();

        // Find the schedule_id with fewer than 30 registrations
        foreach ($registrationsPerSchedule as $scheduleId => $count) {
            if ($count < 2) {
                return $scheduleId;
            }
        }

        // If all schedules have 30 registrations, increment the last schedule_id by 1
        $lastScheduleId = array_key_last($registrationsPerSchedule);
        return $lastScheduleId + 1;
    }

    public function show($id) {
        $registration = Registration::findOrFail($id);
        return response()->json(['registration' => $registration], 200);
    }

    public function update(AdmissionFormRequest $request, $id) {
        $registration = Registration::findOrFail($id);
        // Validate the request data
        $validatedData = $request->validated();
        // Update the registration record in the database
        $registration->update($validatedData);
        // Return a JSON response indicating success
        return response()->json(['message' => 'Registration updated successfully', 'data' => $registration], 200);
    }

    public function destroy($id) {
        $registration = Registration::findOrFail($id);
        $registration->delete();
        // Return a JSON response indicating success
        return response()->json(['message' => 'Registration deleted successfully'], 200);
    }
}
