import Image from "next/image";
import styles from "./page.module.css";
import VideoBackground from '../components/VideoBackground'; // Importando el componente
import BestSellers from '../components/BestSellers'; // Importando el componente
import CommentForm from '../components/CommentForm'; // Importando CommentForm

const Page: React.FC = () => {
  return (
    <div>
      <VideoBackground /> {/* Usando el componente VideoBackground */}

      <main>
        <BestSellers /> {/* Mostrando la sección de productos más vendidos */}
        <CommentForm /> {/* Mostrando la sección de comentarios formulario */}
      </main>
    </div>
    
  );
};

export default Page;
