import Image from 'next/image';

const Header = () => <div className="p-4 bg-blue-900 flex justify-center items-center">
    <Image
        className=''
        src='/quotient.png'
        alt='quotient-logo'
        width={140}
        height={30}
    />
</div>;

export default Header;