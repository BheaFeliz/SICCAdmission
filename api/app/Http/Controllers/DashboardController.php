<?php

namespace App\Http\Controllers;

use App\Models\Registration;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function show(Request $request)
    {
        try {
            $query = Registration::query();

            if ($request->filled(['start_date', 'end_date'])) {
                $query->whereBetween('created_at', [$request->start_date, $request->end_date]);
            }

            $registrations = $query->get();
            $courseCounts = $registrations->groupBy('selectcourse')->map->count();

            return [
                'course_counts' => $courseCounts,
            ];
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}