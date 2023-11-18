import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export const SuccessfulPurchase = () => {
  const navigate = useNavigate()

  const handleReturnToShop = () => {
    navigate('/')
  }

  useEffect(() => {
    const confettiElements = document.querySelectorAll('.confetti');
  
    confettiElements.forEach((confetti) => {
      const randomLeft = Math.random() * 100;
      const randomTop = Math.random() * 100;
      confetti.style.left = `${randomLeft}vw`;
      confetti.style.top = `${randomTop}vh`;
      confetti.classList.add('animated');
  
      confetti.addEventListener('animationend', () => {
        confetti.parentNode.removeChild(confetti);
      });
    });
  
    return () => {
      confettiElements.forEach((confetti) => {
        confetti.removeEventListener('animationend', () => {
          confetti.parentNode.removeChild(confetti);
        });
      });
    };
  }, []);
  

  return (
    <div className='success-purchase'>
        {[...Array(150)].map((_, index) => (
          <div key={index} className='confetti'></div>
        ))}
      <p className='congratulations-text'>🎉 
        Congratulations! You have successfully purchased the item. 🎉
      </p>
      <button 
        className='return-to-shop-button' 
        onClick={handleReturnToShop}>
          Return to Shop
      </button>
    </div>
  );
  
}
