import React, { useEffect, useState } from 'react';
import socket from '../socket';
import { toast } from 'react-toastify';

function LiveFeed() {
  useEffect(() => {
    socket.on('newNotification', (data) => {
      console.log('📩 Notification:', data);

      // 🔔 Show toast
      toast.info(`⚽ ${data.message}`, {
        position: "bottom-right",
        autoClose: 4000,
        pauseOnHover: true,
        draggable: true,
      });
    });

    return () => {
      socket.off('newNotification');
    };
  }, []);

  return (
    <div style={{ display: 'none' }} />  // Hides the component visually
  );
}

export default LiveFeed;
