import DesktopHeader from './DesktopHeader';
import MobileHeaderLayout from './MobileHeaderLayout';

type HeaderProps = {
  title?: string;
  menu?: React.ReactNode;
};

export default function Header({ title, menu }: HeaderProps) {
  return (
    <header>
      <div className="md:hidden">
        <MobileHeaderLayout title={title} menu={menu} />
      </div>
      <div className="hidden md:block">
        <DesktopHeader title={title} menu={menu} />
      </div>
    </header>
  );
}
