import React from 'react';


interface ProductPrice {
  value: number;
  text: string;
}

interface Product {
  productId: number;
  name: string;
  sku: string;
  url: string;
  image?: {
    alt?: string;
    url?: string;
  };
  price?: {
    regular?: ProductPrice;
    special?: ProductPrice;
  };
  inventory?: {
    isInStock: boolean;
  };
}

interface LojaRoupasProps {
  products?: {
    items?: Product[];
    total?: number;
  };
}

const LojaRoupas: React.FC<LojaRoupasProps> = ({ products }) => {
  const productList = products?.items?.slice(0, 8) || [];

  return (
    <div className="fashion-home">

      {/* HERO */}
      <section className="fashion-hero">
        <div className="fashion-hero__content">
          <span className="fashion-hero__eyebrow">
            NOVA COLEÇÃO 2026
          </span>

          <h1>
            Vista seu estilo.
            <br />
            Mostre quem você é.
          </h1>

          <p>
            Novidades selecionadas para quem busca estilo,
            conforto e personalidade.
          </p>

          <div className="fashion-hero__actions">
            <a
              href="/category/feminino"
              className="fashion-button fashion-button--primary"
            >
              Comprar feminino
            </a>

            <a
              href="/category/masculino"
              className="fashion-button fashion-button--secondary"
            >
              Comprar masculino
            </a>
          </div>
        </div>

        <div className="fashion-hero__visual">
          <img
            src="/images/home/hero.jpg"
            alt="Nova coleção"
            className="fashion-hero__image"
          />
        </div>
      </section>

      {/* CATEGORIAS */}
      <section className="fashion-categories">
        <div className="fashion-section-heading">
          <span>DESCUBRA</span>
          <h2>Compre por categoria</h2>
        </div>

        <div className="fashion-category-grid">

          <a
            href="/category/feminino"
            className="fashion-category-card"
          >
            <div className="fashion-category-card__image">
              <img
                src="/images/home/feminino.jpg"
                alt="Moda feminina"
              />
            </div>

            <h3>Feminino</h3>
            <p>Ver coleção →</p>
          </a>

          <a
            href="/category/masculino"
            className="fashion-category-card"
          >
            <div className="fashion-category-card__image">
              <img
                src="/images/home/masculino.jpg"
                alt="Moda masculina"
              />
            </div>

            <h3>Masculino</h3>
            <p>Ver coleção →</p>
          </a>

          <a
            href="/category/camisetas"
            className="fashion-category-card"
          >
            <div className="fashion-category-card__image">
              <img
                src="/images/home/camisetas.jpg"
                alt="Camisetas"
              />
            </div>

            <h3>Camisetas</h3>
            <p>Ver produtos →</p>
          </a>

          <a
            href="/category/acessorios"
            className="fashion-category-card"
          >
            <div className="fashion-category-card__image">
              <img
                src="/images/home/acessorios.jpg"
                alt="Acessórios"
              />
            </div>

            <h3>Acessórios</h3>
            <p>Ver produtos →</p>
          </a>

        </div>
      </section>

      {/* PRODUTOS REAIS */}
      <section className="fashion-products">

        <div className="fashion-section-heading">
          <span>NOVIDADES</span>
          <h2>Produtos em destaque</h2>
        </div>

        {productList.length > 0 ? (
          <div className="fashion-products__grid">

            {productList.map((product) => {
              const regularPrice = product.price?.regular;
              const specialPrice = product.price?.special;

              const hasSpecialPrice =
                specialPrice &&
                specialPrice.value > 0 &&
                regularPrice &&
                specialPrice.value < regularPrice.value;

              return (
                <a
                  href={product.url}
                  className="fashion-product"
                  key={product.productId}
                >

                  <div className="fashion-product__image">

                    {product.image?.url ? (
                      <img
                        src={product.image.url}
                        alt={product.image.alt || product.name}
                      />
                    ) : (
                      <div className="fashion-product__no-image">
                        Sem imagem
                      </div>
                    )}

                    {!product.inventory?.isInStock && (
                      <span className="fashion-product__soldout">
                        ESGOTADO
                      </span>
                    )}

                    {hasSpecialPrice && (
                      <span className="fashion-product__sale">
                        OFERTA
                      </span>
                    )}

                  </div>

                  <div className="fashion-product__info">

                    <h3>{product.name}</h3>

                    <div className="fashion-product__price">

                      {hasSpecialPrice ? (
                        <>
                          <span className="fashion-product__old-price">
                            {regularPrice?.text}
                          </span>

                          <strong>
                            {specialPrice?.text}
                          </strong>
                        </>
                      ) : (
                        <strong>
                          {regularPrice?.text || 'Consultar preço'}
                        </strong>
                      )}

                    </div>

                  </div>

                </a>
              );
            })}

          </div>
        ) : (
          <div className="fashion-products__empty">
            <h3>Nenhum produto cadastrado ainda.</h3>

            <p>
              Cadastre produtos pelo painel administrativo do EverShop
              e eles aparecerão automaticamente aqui.
            </p>
          </div>
        )}

      </section>

      {/* PROMOÇÃO */}
      <section className="fashion-promo">
        <div>
          <span>OFERTA ESPECIAL</span>

          <h2>Até 30% OFF</h2>

          <p>
            Peças selecionadas por tempo limitado.
          </p>
        </div>

        <a
          href="/category/promocoes"
          className="fashion-button fashion-button--light"
        >
          Ver promoções
        </a>
      </section>

      {/* BENEFÍCIOS */}
      <section className="fashion-benefits">

        <div className="fashion-benefit">
          <strong>PIX</strong>
          <h3>Pagamento rápido</h3>
          <p>Compre com segurança e praticidade.</p>
        </div>

        <div className="fashion-benefit">
          <strong>ENVIO</strong>
          <h3>Entrega para todo Brasil</h3>
          <p>Acompanhe seu pedido até sua casa.</p>
        </div>

        <div className="fashion-benefit">
          <strong>TROCAS</strong>
          <h3>Compra tranquila</h3>
          <p>Processo simples para troca de produtos.</p>
        </div>

        <div className="fashion-benefit">
          <strong>SEGURANÇA</strong>
          <h3>Compra protegida</h3>
          <p>Seus dados tratados com segurança.</p>
        </div>

      </section>

      {/* NEWSLETTER */}
      <section className="fashion-newsletter">

        <span>FIQUE POR DENTRO</span>

        <h2>Novidades direto para você</h2>

        <p>
          Receba lançamentos, promoções e novidades da nossa loja.
        </p>

        <div className="fashion-newsletter__form">
          <input
            type="email"
            placeholder="Digite seu e-mail"
            aria-label="E-mail"
          />

          <button type="button">
            Quero receber
          </button>
        </div>

      </section>

    </div>
  );
};

export default LojaRoupas;

export const layout = {
  areaId: 'content',
  sortOrder: 1
};

export const query = `
  query Query {
    products {
      items {
        ...HomeProduct
      }
      total
    }
  }
`;

export const fragments = `
  fragment HomeProduct on Product {
    productId
    name
    sku

    price {
      regular {
        value
        text
      }

      special {
        value
        text
      }
    }

    inventory {
      isInStock
    }

    image {
      alt
      url
    }

    url
  }
`;