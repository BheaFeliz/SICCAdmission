<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ScheduleController extends Controller
{
    private function logActivity($action, $schedule = null, $data = null)
    {
        // Only log when authenticated to avoid FK constraint issues for guests
        if (Auth::check()) {
            ActivityLog::create([
                'action' => $action,
                'data' => $data ? json_encode($data) : null,
                'user_id' => Auth::id(),
                'username' => Auth::user()->username,
            ]);
        }
    }

    public function index()
    {
        $this->logActivity('get_schedules');
        return response()->json(Schedule::all(), 200);
    }

    public function show(string $id)
    {
        $schedule = Schedule::withTrashed()
            ->with(['registrations' => function ($query) {
                $query->withTrashed();
            }])
            ->find($id);

        if ($schedule) {
            $this->logActivity('get_schedule', $schedule);
            return response()->json($schedule, 200);
        } else {
            $this->logActivity('get_schedule_not_found', null, ['id' => $id]);
            return response()->json(['message' => 'Schedule not found'], 404);
        }
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'date' => 'required|date',
            'startTime' => 'required',
            'endTime' => 'required',
            'session' => 'required|string|max:255',
            'max_registrations' => 'required|integer|min:0',
            'remark' => 'string|nullable|max:200',
            'allowed_courses' => 'nullable|array',
            'allowed_courses.*' => 'integer|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $date = Carbon::parse($request->date)->format('Y-m-d');

        $schedule = new Schedule();
        $schedule->name = $request->name;
        $schedule->date = $date;
        $schedule->startTime = $request->startTime;
        $schedule->endTime = $request->endTime;
        $schedule->session = $request->session;
        $schedule->max_registrations = $request->max_registrations;
        $schedule->remark = $request->remark;
        $schedule->allowed_courses = $request->allowed_courses;
        $schedule->save();

        $this->logActivity('create_schedule', $schedule, $request->all());
        return response()->json($schedule, 201);
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'date' => 'date',
            'startTime' => 'string',
            'endTime' => 'string',
            'session' => 'string|max:255',
            'max_registrations' => 'integer|min:0',
            'remark' => 'string|nullable|max:200',
            'allowed_courses' => 'nullable|array',
            'allowed_courses.*' => 'integer|exists:courses,id',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $schedule = Schedule::find($id);
        if ($schedule) {
            if ($request->has('date')) {
                $request['date'] = Carbon::parse($request->date)->format('Y-m-d');
            }
            $schedule->update($request->all());
            $this->logActivity('update_schedule', $schedule, $request->all());
            return response()->json($schedule, 200);
        } else {
            $this->logActivity('update_schedule_not_found', null, ['id' => $id]);
            return response()->json(['message' => 'Schedule not found'], 404);
        }
    }

    public function getDeletedSchedules()
    {
        $this->logActivity('get_deleted_schedules');
        $schedules = Schedule::onlyTrashed()->with(['registrations' => function ($query) {
            $query->withTrashed();
        }])->get();
    
        return response()->json($schedules);
    }

    public function destroy($id)
    {
        $schedule = Schedule::findOrFail($id);
    
        // Soft delete the schedule and its associated registrations
        foreach ($schedule->registrations as $registration) {
            $registration->delete();
        }
    
        $schedule->delete();
        $this->logActivity('delete_schedule', $schedule);
    
        return response()->json(['message' => 'Schedule deleted successfully'], 200);
    }

    public function updateScheduleMaxRegistrations(Request $request, $scheduleId)
{
    $validatedData = $request->validate([
        'max_registrations' => 'required|integer|min:0',
    ]);

    // Find the specific schedule by ID and update its max_registrations value
    $schedule = Schedule::findOrFail($scheduleId);
    $schedule->max_registrations = $validatedData['max_registrations'];
    $schedule->save();

    $this->logActivity('update_schedule_max_registrations', $scheduleId, $request->all());
    return response()->json(['message' => 'Schedule updated successfully']);
}

public function getDeletedAndNonDeletedRegistrations()
{
    // Retrieve deleted schedules and their deleted registrations
    $deletedRegistrations = Schedule::onlyTrashed()
        ->with(['registrations' => function ($query) {
            $query->onlyTrashed(); // Fetch only soft-deleted registrations
        }])
        ->get()
        ->pluck('registrations')
        ->flatten(); // Flatten to merge all registration arrays into one list

    // Retrieve non-deleted schedules and their non-deleted registrations
    $nonDeletedRegistrations = Schedule::with(['registrations' => function ($query) {
        $query->whereNull('deleted_at'); // Fetch only non-deleted registrations
    }])
    ->get()
    ->pluck('registrations')
    ->flatten(); // Flatten to merge all registration arrays into one list

    // Return both deleted and non-deleted registrations in the response
    return response()->json([
        'deleted_registrations' => $deletedRegistrations,
        'non_deleted_registrations' => $nonDeletedRegistrations
    ], 200);
}

public function getActiveSchedules()
{
    $schedules = Schedule::with(['registrations' => function ($query) {
        $query->whereNull('deleted_at'); // Fetch only non-deleted registrations
    }])
    ->whereNull('deleted_at') // Fetch only non-deleted schedules
    ->get();

    return response()->json($schedules);
}


}
