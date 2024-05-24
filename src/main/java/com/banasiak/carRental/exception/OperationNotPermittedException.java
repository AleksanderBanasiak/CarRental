package com.banasiak.carRental.exception;


public class OperationNotPermittedException extends RuntimeException{

    public OperationNotPermittedException(String s){
        super(s);
    }

}
