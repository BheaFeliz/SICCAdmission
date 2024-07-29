<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

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

        $course = Course::create($validated);

        return response()->json($course, 201);
    }

    // Update a course
    public function update(Request $request, $id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $validated = $request->validate([
            'value' => 'required|unique:courses,value,' . $id,
            'label' => 'required',
        ]);

        $course->update($validated);

        return response()->json($course, 200);
    }

    // Delete a course
    public function destroy($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        $course->delete();

        return response()->json(['message' => 'Course deleted successfully'], 200);
    }

    // Show a specific course
    public function show($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json($course);
    }
}
