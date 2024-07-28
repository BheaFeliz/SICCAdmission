<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    // Get all courses
    
    public function index()
    {
        $courses = Course::all();
        return response()->json(['courses' => $courses]);
    }

    // Add a new course
    public function store(Request $request)
    {
        $validated = $request->validate([
            'value' => 'required|unique:courses',
            'label' => 'required',
        ]);

        $courses = Course::create($validated);

        return response()->json($courses, 201);
    }

    public function destroy($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->delete();

        return response()->json(['message' => 'Course deleted successfully'], 200);
    }

    // Other methods for updating or deleting courses can be added as needed
}
