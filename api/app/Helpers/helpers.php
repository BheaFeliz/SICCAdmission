<?php

use Carbon\Carbon;

if (!function_exists('generateReferenceNumber')) {
    function generateReferenceNumber($registrationsid, $schedulesid, $created_at)
    {
        $date = Carbon::parse($created_at);
        $month = $date->format('m');
        $year = $date->format('Y');

        return $schedulesid . '-' . $registrationsid . '-' . $month . '-' . $year;
    }
}
