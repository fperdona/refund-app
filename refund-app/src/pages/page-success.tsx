import { Link } from "react-router";
import Check from "../assets/icons/check.svg?react";
import Button from "../core-components/button";

export default function PageSuccess() {
    return (
        <div className="max-w-lg mx-auto">
            <div className="bg-white rounded-2xl p-8 mt-4 text-center">
                <h1 className="text-2xl font-bold text-green-100 mb-6">
                    Solicitação enviada!
                </h1>

                <div className="flex justify-center mb-6">
                    <div className="w-24 h-24 rounded-full border-4 border-green-100 flex items-center justify-center">
                        <Check className="w-12 h-12 fill-green-100" />
                    </div>
                </div>

                <p className="text-gray-200 mb-8">
                    Agora é apenas aguardar! Sua solicitação será analisada e, em breve, o setor financeiro irá entrar em contato com você.
                </p>

                <Link to="/novo">
                    <Button>Nova solicitação</Button>
                </Link>
            </div>
        </div>
    );
}
