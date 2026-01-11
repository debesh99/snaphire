package com.debesh.snaphire.Exception;

import com.debesh.snaphire.Model.ErrorOutputModel;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class GlobalExceptionHandler extends ResponseEntityExceptionHandler {

    // Handling global exception
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorOutputModel> handleGlobalException(Exception e) {
        ErrorOutputModel error = new ErrorOutputModel(HttpStatus.INTERNAL_SERVER_ERROR.value(), e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    // Handling Job Not Found Exception
    @ExceptionHandler(JobNotFoundException.class)
    public ResponseEntity<ErrorOutputModel> handleJobNotFoundException(Exception e) {
        ErrorOutputModel error = new ErrorOutputModel(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    //Handling Company Not Found Exception
    @ExceptionHandler(CompanyNotFoundException.class)
    public ResponseEntity<ErrorOutputModel> handleCompanyNotFoundException(Exception e) {
        ErrorOutputModel error = new ErrorOutputModel(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }

    //handling Review Not found Exception
    @ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<ErrorOutputModel> handleReviewNotFoundException(Exception e) {
        ErrorOutputModel error = new ErrorOutputModel(HttpStatus.NOT_FOUND.value(), e.getMessage());
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
}
