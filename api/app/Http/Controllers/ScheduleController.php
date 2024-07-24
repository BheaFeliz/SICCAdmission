<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    public function index()
    {
        return response()->json(Schedule::all(), 200);
    }

    public function show(string $id)
    {
        $schedule = Schedule::with('registrations')->find($id);

        if ($schedule) {
            return response()->json($schedule, 200);
        } else {
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
            return response()->json($schedule, 200);
        } else {
            return response()->json(['message' => 'Schedule not found'], 404);
        }
    }

    public function getDeletedSchedules()
    {
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
    
        return response()->json(['message' => 'Schedule deleted successfully'], 200);
    }
}
