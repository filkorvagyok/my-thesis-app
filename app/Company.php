<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Company extends Model
{
    public function projects(){
        return $this->belongsToMany('App\Project');
    }

    public function contacts(){
        return $this->belongsToMany('App\Contact');
    }

    public function industry(){
        return $this->belongsTo('App\Industry');
    }

    public function employeesnumber(){
        return $this->belongsTo('App\Employeesnumber');
    }

    public function yearlyincome(){
        return $this->belongsTo('App\Yearlyincome');
    }
}
