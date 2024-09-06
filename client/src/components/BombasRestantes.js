import React from 'react';

const BombasRestantes = () => {
  return (
    <div style={{ alignItems: 'center', display: 'flex', justifyContent: 'center' }} className="mb-2">
      <button type="button" className="btn btn-primary">
        Bombas Restantes <span id="nBombas" className="badge bg-secondary"></span>
      </button>
    </div>
  );
};

export default BombasRestantes;