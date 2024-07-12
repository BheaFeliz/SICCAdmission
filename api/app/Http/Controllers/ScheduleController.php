<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Schedule;
use Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class ScheduleController extends Controller
{
    // Fetch all schedules
    public function index()
    {
        return response()->json(Schedule::all(), 200);
    }

    // Fetch a single schedule by ID
    public function show(string $id)
{
    $schedule = Schedule::find($id);
    if ($schedule) {
        return response()->json($schedule, 200);
    } else {
        return response()->json(['message' => 'Schedule not found'], 404);
    }
}

    // Create a new schedule
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
           'name' => 'required|string|max:255',
            'date' => 'required|date',
            'startTime' => 'required',
            'endTime' => 'required',
            'description' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Format the date to 'Y-m-d' format
        $date = Carbon::parse($request->date)->format('Y-m-d');

        $schedule = new Schedule();
        $schedule->name = $request->name;
        $schedule->date = $date;
        $schedule->startTime = $request->startTime;
        $schedule->endTime = $request->endTime;
        $schedule->description = $request->description;
        $schedule->save();

        return response()->json($schedule, 201);
    }

    // Update an existing schedule
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'string',
            'date' => 'date',
            'startTime' => 'string',
            'endTime' => 'string',
            'description' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        $schedule = Schedule::find($id);
        if ($schedule) {
            if ($request->has('date')) {
                // Format the date to 'Y-m-d' format
                $request['date'] = Carbon::parse($request->date)->format('Y-m-d');
            }
            $schedule->update($request->all());
            return response()->json($schedule, 200);
        } else {
            return response()->json(['message' => 'Schedule not found'], 404);
        }
    }

    // Delete a schedule
    public function destroy($id)
    {
        $schedule = Schedule::find($id);
        if ($schedule) {
            $schedule->delete();
            return response()->json(['message' => 'Schedule deleted'], 200);
        } else {
            return response()->json(['message' => 'Schedule not found'], 404);
        }
    }
}
