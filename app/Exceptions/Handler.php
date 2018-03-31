<?php

namespace App\Exceptions;

use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\TokenInvalidException;
use Response;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * This is a great spot to send exceptions to Sentry, Bugsnag, etc.
     *
     * @param  \Exception  $exception
     * @return void
     */
    public function report(Exception $exception)
    {
        if($exception instanceof TokenExpiredException){
            return Response::json(['error' => 'Token Expired'], $exception->getStatusCode());
        } else if($exception instanceof TokenInvalidException){
            return Response::json(['error' => 'Token Invalid'], $exception->getStatusCode());
        } else if($exception instanceof JWTException){
            return response()->json(['error' => 'Token Absent'], $e->getStatusCode());
        }
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Illuminate\Http\Response
     */
    public function render($request, Exception $e)
    {
        if ($e instanceof ModelNotFoundException) {
            $e = new NotFoundHttpException($e->getMessage(), $e);
        }
    
        // handle Angular routes when accessed directly from the browser without the need of the '#'
        if ($e instanceof NotFoundHttpException) {
    
            $url = parse_url($request->url());

            $angular_url = $url['scheme'] . '://' . $url['host'] . '/#' . $url['path'];

            return response()->redirectTo($angular_url);
        }
    
        return parent::render($request, $e);
    }
}
