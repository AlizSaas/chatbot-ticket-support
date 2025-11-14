(function() {
  'use strict';

  // Get the script tag to read data-company-id
  const currentScript = document.currentScript || document.querySelector('script[data-company-id]');
  const companyId = currentScript ? currentScript.getAttribute('data-company-id') : null;

  if (!companyId) {
    console.error('ChatWidget: data-company-id attribute is required');
    return;
  }

  // Create chat bubble button
  const bubble = document.createElement('div');
  bubble.id = 'chat-widget-bubble';
  bubble.innerHTML = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.8214 2.48697 15.5291 3.33782 17L2.5 21.5L7 20.6622C8.47087 21.513 10.1786 22 12 22Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  bubble.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    cursor: pointer;
    z-index: 999999;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.2s ease;
  `;

  // Create iframe container
  const container = document.createElement('div');
  container.id = 'chat-widget-container';
  container.style.cssText = `
    position: fixed;
    bottom: 90px;
    right: 20px;
    width: 400px;
    height: 600px;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    z-index: 999998;
    display: none;
    overflow: hidden;
  `;

  // Create iframe
  const iframe = document.createElement('iframe');
  const widgetUrl = currentScript.src.replace('/widget.js', '');
  iframe.src = `${widgetUrl}/widget?cid=${encodeURIComponent(companyId)}`;
  iframe.style.cssText = `
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 12px;
  `;

  container.appendChild(iframe);

  // Toggle functionality
  let isOpen = false;
  bubble.addEventListener('click', function() {
    isOpen = !isOpen;
    container.style.display = isOpen ? 'block' : 'none';
    bubble.style.transform = isOpen ? 'scale(0.9)' : 'scale(1)';
  });

  bubble.addEventListener('mouseenter', function() {
    if (!isOpen) {
      bubble.style.transform = 'scale(1.1)';
    }
  });

  bubble.addEventListener('mouseleave', function() {
    if (!isOpen) {
      bubble.style.transform = 'scale(1)';
    }
  });

  // Append to body
  document.body.appendChild(bubble);
  document.body.appendChild(container);
})();
