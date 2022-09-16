import { useState } from "react";
import { ICharacter } from "../../../models/models";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CharacterModal from "./CharacterModal/CharacterModal";

interface CharacterProps {
  data: ICharacter;
}

const Character = ({ data }: CharacterProps) => {
  const [isModal, setIsModal] = useState<boolean>(false);

  const toggleModal = (): void => {
    setIsModal(!isModal);
  };

  return (
    <Card sx={{ width: 345, margin: "0 16px 32px" }}>
      {isModal && (
        <CharacterModal data={data} open={isModal} toggleModal={toggleModal} />
      )}
      <CardMedia
        component="img"
        height="140"
        image={data.image}
        alt={data.name}
        sx={{ objectFit: "cover", width: "100%", height: "100%" }}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {data.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {data.species + ", " + data.gender}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Origin - {data.origin.name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button onClick={() => toggleModal()} size="small">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default Character;
