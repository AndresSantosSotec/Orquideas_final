<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('tb_grupo', function (Blueprint $table) {
            $table->id('id_grupo');
            $table->string('nombre_grupo', 100);
            $table->string('Cod_Grupo', 25);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('tb_grupo');
    }
};