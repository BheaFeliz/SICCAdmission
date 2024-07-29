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
        ActivityLog::create([
            'action' => $action,
            'data' => $data ? json_encode($data) : null,
            'user_id' => Auth::id(), // Assuming you are using Laravel's authentication
            'username' => Auth::user() ? Auth::user()->username : 'guest',
        ]);
    }

    public function index()
    {
        $this->logActivity('get_schedules');
        return response()->json(Schedule::all(), 200);
    }

    public function show(string $id)
    {
        $schedule = Schedule::with('registrations')->find($id);

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
            'remark' => 'string|nullable|max:200',
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
        $schedule->remark = $request->remark;
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
            'remark' => 'string|nullable|max:200',
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

    public function updateAll(Request $request)
    {
        $validatedData = $request->validate([
            'max_registrations' => 'required|integer|min:0',
        ]);

        // Update all schedules with the new max_registrations value
        Schedule::query()->update(['max_registrations' => $validatedData['max_registrations']]);

        $this->logActivity('update_all_schedules', null, $request->all());
        return response()->json(['message' => 'All schedules updated successfully']);
    }
}
