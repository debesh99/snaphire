package com.debesh.snaphire.Exception;

public class JobNotFoundException extends RuntimeException {
    
    public JobNotFoundException(String message) {
        super(message);
    }
    
    public JobNotFoundException(String message, Throwable cause) {
        super(message, cause);
    }
}
