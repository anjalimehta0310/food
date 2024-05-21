import alanBtn from '@alan-ai/alan-sdk-web';
import { useEffect } from 'react';

const AlanAIIntegration = () => {
  useEffect(() => {
    alanBtn({
      key: 'c1bbc07fbb47ebb4bb5064a62d97d25d2e956eca572e1d8b807a3e2338fdd0dc/stage',
      onCommand: (commandData) => {
        if (commandData.command === 'go:back') {
          // Call the client code that will react to the received command
          // For example:
          console.log('Go back command received from Alan AI');
        }
        // Handle other commands as needed
      }
    });
  }, []);

  return null; // or you can return a placeholder element if needed
}

export default AlanAIIntegration;
