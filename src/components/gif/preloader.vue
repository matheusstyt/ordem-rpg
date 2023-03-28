<template>
    <div class="modal-preloader">
        <div class="preloader">
            <div class="spinner"></div>
        </div>
    </div>
    
  </template>
  
  <style>
  .modal-preloader{
    background-color: rgba(0, 0, 0, 1);
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    position: fixed;
    z-index: 4;
  }
  .preloader {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
  
  .spinner {
    border: 6px solid rgba(0, 0, 0, 0.1);
    border-top-color: rgb(255, 200, 148);
    border-radius: 50%;
    width: 40px;
    height: 40px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  </style>
  