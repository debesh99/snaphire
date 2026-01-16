package com.debesh.snaphire.Exception;

public class ApplicationNotFoundException extends RuntimeException {
    
    public ApplicationNotFoundException(String message) {
        super(message);
    }
    
    public ApplicationNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
