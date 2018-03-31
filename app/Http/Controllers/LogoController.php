<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\File;

class LogoController extends Controller{

    public function postLogo(Request $request){
        $file = $request->file('image');
        $filename = 'adsadf.jpg';
        if($file){
            Storage::disk('local')->put($filename, File::get($file));
        }
        return response()->json(['file' => $file], 201);
    }
}