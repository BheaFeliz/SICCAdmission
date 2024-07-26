<?php

namespace App\Http\Controllers;

use App\Models\ActivityLog;
use Illuminate\Http\Request;

class ActivityLogController extends Controller
{
    public function index()
    {
        return response()->json(ActivityLog::all(), 200);
    }

    public function show($id)
    {
        $log = ActivityLog::find($id);

        if ($log) {
            return response()->json($log, 200);
        } else {
            return response()->json(['message' => 'Activity log not found'], 404);
        }
    }
}
