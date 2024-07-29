<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserIdAndUsernameToActivityLogs extends Migration
{
    public function up()
    {
        Schema::table('activity_logs', function (Blueprint $table) {
            if (!Schema::hasColumn('activity_logs', 'user_id')) {
                $table->foreignId('user_id')->after('id')->constrained('users')->onDelete('cascade');
            }
            if (!Schema::hasColumn('activity_logs', 'username')) {
                $table->string('username')->after('user_id');
            }
        });
    }

    public function down()
    {
        Schema::table('activity_logs', function (Blueprint $table) {
            if (Schema::hasColumn('activity_logs', 'user_id')) {
                $table->dropForeign(['user_id']);
                $table->dropColumn('user_id');
            }
            if (Schema::hasColumn('activity_logs', 'username')) {
                $table->dropColumn('username');
            }
        });
    }
}
