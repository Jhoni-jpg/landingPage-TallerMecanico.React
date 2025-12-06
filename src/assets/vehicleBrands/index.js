// src/assets/vehicleBrands/index.js

// Carga todos los PNG de la carpeta, eager = true para obtener los paths directamente
const logosModules = import.meta.glob('./*.png', { eager: true, import: 'default' });

// Convierte a un objeto usable: { AUDI: '/src/assets/vehicleBrands/AUDI.png', ... }
const logos = Object.fromEntries(
  Object.entries(logosModules).map(([path, src]) => {
    const name = path.replace('./', '').replace('.png', '');
    return [name, src];
  })
);

export default logos;