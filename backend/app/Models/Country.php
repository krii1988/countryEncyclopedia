<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'common_name',
        'official_name',
        'country_code',
        'translations',
        'population',
        'population_rank',
        'flag',
        'area',
        'borders',
        'languages'
    ];
}
