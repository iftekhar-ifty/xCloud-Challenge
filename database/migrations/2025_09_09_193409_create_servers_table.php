<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('servers', function (Blueprint $table) {
            $table->id();
            $table->string('name')->index();
            $table->ipAddress()->unique()->index();
            $table->string('provider')->index();
            $table->string('status')->index()->default('inactive');
            $table->string('cpu_cores')->index();
            $table->string('ram_mb')->index();
            $table->string('storage_gb')->index();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('servers');
    }
};
