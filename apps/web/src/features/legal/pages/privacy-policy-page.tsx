import { Check, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Brand } from '@/features/legal/components/brand';
import { PolicySection } from '@/features/legal/components/policy-section';

const navigationItems = ['Treinos', 'Nutrição', 'Para profissionais', 'Planos'];

const footerLinks = ['Privacidade', 'Termos de uso', 'FAQ', 'Suporte', 'Trabalhe conosco'];

const collectedData = [
  {
    title: 'Informações de contato e cadastro:',
    description: 'Nome, e-mail, telefone e dados de pagamento.',
  },
  {
    title: 'Métricas de saúde e biometria:',
    description:
      'Histórico médico básico para segurança nos treinos, peso, altura e composição corporal (quando fornecidos voluntariamente).',
  },
  {
    title: 'Dados de performance e treino:',
    description:
      'Frequência na academia, rotinas de exercícios registradas no app, progresso de cargas e feedback de treinadores.',
  },
];

export function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen overflow-hidden bg-[#121414] pt-[73px] font-['Arial',sans-serif] text-white">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-[#444933]/30 bg-[#121414]/80 backdrop-blur-md">
        <div className="mx-auto flex min-h-[73px] max-w-[1440px] items-center justify-between gap-5 px-5 py-3 sm:px-8 lg:px-16">
          <Brand />

          <nav aria-label="Navegação principal" className="hidden items-center gap-8 lg:flex">
            {navigationItems.map((item) => (
              <a
                className="text-sm font-bold uppercase tracking-[0.1em] text-[#c4c9ac] transition-colors hover:text-[#c3f400]"
                href="#conteudo"
                key={item}
              >
                {item}
              </a>
            ))}
          </nav>

          <Link
            className="rounded-[4px] bg-[#c3f400] px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-[#283500] transition-colors hover:bg-[#d4ff40] sm:px-8 sm:text-sm"
            to="/register"
          >
            Começar agora
          </Link>
        </div>
      </header>

      <main id="conteudo">
        <section className="relative isolate overflow-hidden border-b border-[#1e2020] px-5 py-20 text-center sm:px-8 sm:py-[120px]">
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 opacity-70"
            style={{
              background:
                'radial-gradient(ellipse 40% 65% at 50% 0%, rgba(195, 244, 0, 0.2), rgba(18, 20, 20, 0) 70%)',
            }}
          />
          <p className="text-sm font-bold uppercase tracking-[0.1em] text-[#c3f400]">Documento legal</p>
          <h1 className="mt-4 font-['Impact','Arial_Narrow',sans-serif] text-5xl uppercase leading-[0.95] tracking-[0.02em] text-white sm:text-7xl lg:text-[80px]">
            Política de <span className="text-[#c3f400]">privacidade</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#c4c9ac] sm:text-lg">
            Transparência e disciplina no tratamento dos seus dados de alta performance.
          </p>
        </section>

        <article className="mx-auto flex max-w-[960px] flex-col gap-12 px-5 py-16 sm:px-8 sm:py-20">
          <PolicySection title="1. Introdução">
            <p>
              A YUME FIT está comprometida com a privacidade e a segurança dos dados dos nossos alunos e profissionais parceiros. Entendemos que informações de performance e saúde são sensíveis e requerem o mais alto nível de proteção, alinhado ao nosso padrão de excelência em treinamento. Esta política descreve como coletamos, usamos e protegemos suas informações.
            </p>
          </PolicySection>

          <PolicySection title="2. Coleta de dados">
            <p>
              Para otimizar sua jornada de alta performance, coletamos dados essenciais durante seu uso das nossas instalações e plataformas digitais:
            </p>
            <ul className="mt-5 space-y-3">
              {collectedData.map((item) => (
                <li className="flex gap-3" key={item.title}>
                  <Check aria-hidden="true" className="mt-1 size-4 shrink-0 text-[#c3f400]" strokeWidth={3} />
                  <span>
                    <strong className="font-bold text-[#d8ddc3]">{item.title}</strong> {item.description}
                  </span>
                </li>
              ))}
            </ul>
          </PolicySection>

          <PolicySection title="3. Uso de informações">
            <p>
              Utilizamos seus dados exclusivamente para propósitos relacionados à gestão fitness e melhoria da sua experiência conosco. Isso inclui a personalização de treinos pelos nossos profissionais, gestão administrativa da sua assinatura, envio de comunicados importantes sobre a infraestrutura e análises internas para aprimorar nossos serviços de alta performance. Não vendemos seus dados para terceiros.
            </p>
          </PolicySection>

          <PolicySection title="4. Segurança de dados">
            <div className="border border-[#333535] bg-[#1e2020] p-5 sm:p-6">
              Implementamos rigorosos protocolos de segurança física e digital. Seus dados são armazenados em servidores seguros com criptografia de ponta a ponta (AES-256). O acesso às suas métricas de saúde é restrito apenas a você e aos treinadores oficialmente designados para acompanhar sua evolução, mediante autenticação de múltiplos fatores.
            </div>
          </PolicySection>

          <PolicySection title="5. Contato e suporte">
            <p>
              Se você tiver dúvidas sobre esta política, desejar atualizar suas informações ou exercer seus direitos de exclusão de dados conforme a LGPD, nossa equipe de suporte está à disposição.
            </p>
            <a
              className="mt-5 inline-flex items-center gap-2 border-b border-[#c3f400] pb-1 text-sm font-bold uppercase tracking-[0.025em] text-[#c3f400] transition-colors hover:text-white"
              href="mailto:suporte@yumefit.com.br"
            >
              <Mail aria-hidden="true" className="size-4" />
              suporte@yumefit.com.br
            </a>
          </PolicySection>
        </article>
      </main>

      <footer className="border-t border-[#444933] bg-[#0c0f0f]">
        <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-20 lg:px-16">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <Brand compact />
              <p className="mt-4 text-base text-[#c4c9ac]">Performance e Disciplina.</p>
            </div>
            <nav aria-label="Links do rodapé" className="flex flex-wrap content-start gap-x-6 gap-y-4 md:justify-end">
              {footerLinks.map((item) => (
                <a
                  className="text-xs font-medium uppercase text-[#c4c9ac] transition-colors hover:text-[#c3f400]"
                  href={item === 'Privacidade' ? '#conteudo' : '#conteudo'}
                  key={item}
                >
                  {item}
                </a>
              ))}
            </nav>
          </div>
          <div className="mt-12 border-t border-[#444933]/30 pt-6 text-sm text-[#c4c9ac]">
            © 2026 YUME FIT | Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
