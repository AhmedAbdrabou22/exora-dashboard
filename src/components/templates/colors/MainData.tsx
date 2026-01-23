import React, { useState } from 'react';
import { useField } from 'formik';
import { BaseInput } from '../../molecules/BaseInput';

type MainDataProps = {
  update?: { image?: string } | null;
};

function MainData({ update }: MainDataProps) {
  const [field, , helpers] = useField('hex_code');
  const [localColor, setLocalColor] = useState(update?.image || field.value || '#000000');

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = e.target.value;
    setLocalColor(newColor);
    helpers.setValue(newColor);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value;

    // إضافة # تلقائياً
    if (!value.startsWith('#')) {
      value = '#' + value;
    }

    // التحقق من صحة الكود
    if (/^#[0-9A-Fa-f]{0,6}$/.test(value)) {
      setLocalColor(value);
      if (value.length === 7) {
        helpers.setValue(value);
      }
    }
  };

  return (
    <div className="color-container">
      <div className="color-card">
        

        <div className="color-content">

          {/* Color Picker */}
          <div className="picker-section">
            <label className="picker-label">اختر من اللوحة</label>
            <div className="picker-wrapper">
              <input
                type="color"
                value={localColor}
                onChange={handleColorChange}
                className="color-picker"
              />
              <div className="picker-ring" style={{ borderColor: localColor }}></div>
            </div>
          </div>

          {/* Hex Input */}
          <div className="hex-section">
            <label className="hex-label">كود Hex</label>
            <div className="hex-input-wrapper">
              <span className="hex-prefix">#</span>
              <input
                type="text"
                value={localColor.replace('#', '')}
                onChange={handleTextChange}
                maxLength={6}
                placeholder="000000"
                className="hex-input"
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(localColor)}
                className="copy-btn"
                title="نسخ الكود"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              </button>
            </div>
          </div>

                <BaseInput name="name" type="text" label="الاسم " placeholder="ادخل الاسم" />
          
        </div>
      </div>

      <style>{`
        
     

        .card-title {
          color: white;
          font-size: 22px;
          font-weight: 700;
          margin: 0;
          letter-spacing: 0.5px;
        }

        .color-badge {
          padding: 8px 16px;
          border-radius: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.15);
        }

        .badge-text {
          color: white;
          font-weight: 600;
          font-size: 14px;
          font-family: monospace;
          text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
        }

        .color-content {
          padding: 30px;
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .color-preview-section {
          text-align: center;
        }

        .preview-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
          font-weight: 500;
          direction: rtl;
        }

        .preview-box {
          width: 100%;
          height: 120px;
          border-radius: 16px;
          position: relative;
          box-shadow: 
            0 4px 20px rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
          transition: all 0.3s ease;
          overflow: hidden;
        }

        .preview-box:hover {
          transform: translateY(-2px);
          box-shadow: 
            0 8px 30px rgba(0, 0, 0, 0.15),
            inset 0 2px 4px rgba(255, 255, 255, 0.3);
        }

        .preview-overlay {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          color: white;
          opacity: 0.4;
          transition: opacity 0.3s ease;
        }

        .preview-box:hover .preview-overlay {
          opacity: 0.7;
        }

        .picker-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .picker-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
          direction: rtl;
        }

        .picker-wrapper {
          position: relative;
          display: inline-block;
        }

        .color-picker {
          width: 100px;
          height: 100px;
          border: none;
          border-radius: 50%;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        }

        .color-picker:hover {
          transform: scale(1.05);
          box-shadow: 0 6px 25px rgba(0, 0, 0, 0.3);
        }

        .picker-ring {
          position: absolute;
          top: -8px;
          left: -8px;
          right: -8px;
          bottom: -8px;
          border: 3px solid;
          border-radius: 50%;
          pointer-events: none;
          transition: all 0.3s ease;
          opacity: 0.5;
        }

        .hex-section {
          display: flex;
          flex-direction: column;
          gap: 10px;
          direction: rtl;
        }

        .hex-label {
          font-size: 14px;
          color: #666;
          font-weight: 500;
        }

        .hex-input-wrapper {
          display: flex;
          align-items: center;
          background: #f8f9fa;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          padding: 4px;
          transition: all 0.3s ease;
          direction: ltr;
        }

        .hex-input-wrapper:focus-within {
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          background: white;
        }

        .hex-prefix {
          padding: 0 12px;
          color: #999;
          font-weight: 600;
          font-size: 18px;
          font-family: monospace;
        }

        .hex-input {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px 8px;
          font-size: 16px;
          font-family: monospace;
          font-weight: 600;
          color: #333;
          text-transform: uppercase;
          outline: none;
        }

        .hex-input::placeholder {
          color: #ccc;
        }

        .copy-btn {
          background: white;
          border: none;
          padding: 10px;
          border-radius: 8px;
          cursor: pointer;
          color: #667eea;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .copy-btn:hover {
          background: #667eea;
          color: white;
          transform: scale(1.05);
        }

        .copy-btn:active {
          transform: scale(0.95);
        }

        .palette-section {
          direction: rtl;
        }

        .palette-label {
          font-size: 14px;
          color: #666;
          margin-bottom: 12px;
          font-weight: 500;
        }

        .palette-grid {
          display: grid;
          grid-template-columns: repeat(8, 1fr);
          gap: 10px;
        }

        .palette-item {
          width: 100%;
          aspect-ratio: 1;
          border: 2px solid transparent;
          border-radius: 10px;
          cursor: pointer;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
        }

        .palette-item:hover {
          transform: translateY(-3px) scale(1.1);
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
          border-color: white;
        }

        .palette-item:active {
          transform: translateY(-1px) scale(1.05);
        }

        @media (max-width: 500px) {
          .palette-grid {
            grid-template-columns: repeat(4, 1fr);
          }
          
          .card-header {
            flex-direction: column;
            gap: 12px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}

export default MainData;