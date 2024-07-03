<?php

namespace App\Http\Controllers;

use App\Http\Requests\AdmissionFormRequest;
use App\Models\Registration;
use App\Models\Schedule;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;


class RegistrationController extends Controller
{
    public function index()
    {
        $registrations = Registration::all();
        return response()->json(['registrations' => $registrations], 200);
    }

    public function store(Request $request)
{
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
        'schedule_id' => 'integer|exists:schedules,id'
    ]);

    $studentCount = Registration::count();
    $roomNumber = intdiv($studentCount, 30) + 1;

    $validatedData['room_id'] = $roomNumber;

    
    // Create a new registration instance
    $registration = new Registration();
    $registration->fill($validatedData);
    $registration->save();

    // Generate and save the reference number
    $referenceNumber = $registration->generateReferenceNumber($registration->schedule_id);
    $registration->reference_number = $referenceNumber;
    $registration->save();

    // Handle image uploads
    if ($request->hasFile('fileinput')) {
        foreach ($request->file('fileinput') as $file) {
            $path = Storage::put('registrations', $file); // Use putFile instead of put

            $url = Storage::url($path);
            $registration->images()->create(['path' => $url]);
        }
    }

    // Return a response indicating success
    return response()->json(['message' => 'Registration successful', 'reference_number' => $referenceNumber], 201);
}
}
