<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use File;
use Illuminate\Contracts\Filesystem\FileNotFoundException;
use Illuminate\Support\Facades\Auth;

class AngularController extends Controller
{
    public function serve()
    {
        return $this->serveFile('index.html');
    }
    /**
     * Kiszolgáljuk az ngular file-okat, az index.html ami az angular projekt belépő fájlja, ebbe a biztonságos kommunikáció érdekében minden esetben be kell helyezni egy CSRF_TOKEN-t ami a korssite foregirit kivédi!
     * Csak beléptetett User-nek szolgáljuk kia fájlokat!
     * 
     * @param string $fileName A kiszolgálni kívánt file neve
     * @return void
     */
    public function serveFile($fileName)
    {

        try {
            return File::get(public_path() . '/angular/' . $fileName);
        } catch (FileNotFoundException $e) {
			throw $e;
        }
    }

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        dd("Teszt!");
        return $next($request);
    }
}

