export default function Header() {
    return (
        <header>
            <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
                <h1 className="text-xl font-bold">To DO App</h1>
                <nav>
                    <ul className="flex space-x-4">
                        <li><a href="/" className="hover:underline">Home</a></li>
                        <li><a href="/about" className="hover:underline">About</a></li>
                        <li><a href="/contact" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}