import React from "react";

import Bag_ReadingGlasses from "../../assets/gallery/bag_readingglasses.jpg";
import Label_FoodContainers from "../../assets/gallery/label_foodcontainers.jpg";
import Label_PastaBottle from "../../assets/gallery/label_pastabottle.jpg";
import Label_Spices from "../../assets/gallery/label_spices.jpg";
import Label_WoodenSign from "../../assets/gallery/label_woodensign.jpg";
import Mug_PlantLady from "../../assets/gallery/mug_plantlady.JPG";
import Onezie_LittleCheese from "../../assets/gallery/onezie_littlecheese.jpg";
import TShirt_10 from "../../assets/gallery/tshirt_10.JPG";
import TShirt_GameOn from "../../assets/gallery/tshirt_gameon.JPG";
import TShirt_Mermaid from "../../assets/gallery/tshirt_mermaid.jpg";
import TShirt_SpartanRace from "../../assets/gallery/tshirt_spartanrace.jpg";
import TShirt_WildOnes from "../../assets/gallery/tshirt_wildones.jpg";

const getImage = (imagePath) => {
    return (
            <img id={JSON.stringify(imagePath)} src={imagePath} alt={JSON.stringify(imagePath)} className={"product_image-thumbnail"}/>
        );
}

const images = [];
images.push(getImage(Bag_ReadingGlasses));
images.push(getImage(Label_FoodContainers));
images.push(getImage(Label_PastaBottle));
images.push(getImage(Label_Spices));
images.push(getImage(Label_WoodenSign));
images.push(getImage(Mug_PlantLady));
images.push(getImage(Onezie_LittleCheese));
images.push(getImage(TShirt_10));
images.push(getImage(TShirt_GameOn));
images.push(getImage(TShirt_Mermaid));
images.push(getImage(TShirt_SpartanRace));
images.push(getImage(TShirt_WildOnes));

export const Gallery = () => {
    return (
        <>
            {images}
        </>
    )
}

