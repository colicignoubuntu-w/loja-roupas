import React from 'react';

export default function FashionMenu() {
  return (
    <nav className="fashion-menu" aria-label="Menu principal">
      <a href="/">Novidades</a>
      <a href="/category/feminino">Feminino</a>
      <a href="/category/masculino">Masculino</a>
      <a href="/category/camisetas">Camisetas</a>
      <a href="/category/acessorios">Acessórios</a>
      <a href="/category/promocoes">Promoções</a>
    </nav>
  );
}

export const layout = {
  areaId: 'headerMiddleLeft',
  sortOrder: 10
};