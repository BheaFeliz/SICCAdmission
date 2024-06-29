<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use App\Models\Schedule;

class GenerateReferenceController extends Controller
{
    public function show($registrationId, $scheduleId)
{
    $registration = Registration::findOrFail($registrationId);
    $referenceNumber = $registration->generateReferenceNumber($scheduleId);

    return view('your-view', compact('registration', 'referenceNumber'));
}
}
