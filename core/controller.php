<?php

abstract class Controller
{

    /**
     * @var array
     */
    protected $route_params = [];

    /**
     *
     * @param array $route_params  Parameters from the route
     *
     * @return void
     */
    public function __construct($route_params)
    {
        $this->route_params = $route_params;
    }

    /**
     *
     * @param string 
     * @param array
     *
     * @return void
     */
    public function __call($name, $args)
    {
        $method = $name . 'Action';

        if (method_exists($this, $method)) {
            if ($this->before() !== false) {
                call_user_func_array([$this, $method], $args);
                $this->after();
            }
        } else {
            throw new \Exception("Method $method not found in controller " . get_class($this));
        }
    }



    /**
     * @return void
     */
    protected function before()
    {
    }

    /**
     * @return void
     */
    protected function after()
    {
    }
}
