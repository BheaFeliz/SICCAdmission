<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

class UpdateExistingActivityLogs extends Migration
{
    public function up()
    {
        $adminUser = DB::table('users')->where('username', 'admin')->first();

        if ($adminUser) {
            DB::table('activity_logs')->update(['user_id' => $adminUser->id, 'username' => $adminUser->username]);
        }
    }

    public function down()
    {
        // Optionally reverse the update, if needed
    }
}
