import DesktopHeader from './desktop-header';
import MobileHeaderLayout from './mobile-header-layout';

type HeaderProps = {
  title?: string;
  menu?: React.ReactNode;
};

export default function Header({ title, menu }: HeaderProps) {
  return (
    <header className="sticky top-0 z-40">
      <div className="md:hidden">
        <MobileHeaderLayout title={title} menu={menu} />
      </div>
      <div className="hidden md:block">
        <DesktopHeader title={title} menu={menu} />
      </div>
    </header>
  );
}
