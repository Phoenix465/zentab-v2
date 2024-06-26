import React, { useState, useEffect } from "react";
import { Flex, Text, Icon, IconButton, Link } from "@chakra-ui/react";
import { ExternalLinkIcon, RepeatIcon } from "@chakra-ui/icons";
import { FaGlobeAmericas } from "react-icons/fa";

const Background = ({ setBackground }) => {
  const [backgrounds, setBackgrounds] = useState([]);
  const [selectedBackground, setSelectedBackground] = useState(null);

  useEffect(() => {
    fetch(
      "https://raw.githubusercontent.com/limhenry/earthview/master/earthview.json",
    )
      .then((response) => response.json())
      .then((data) => {
        setBackgrounds(data);
        const randomIndex = Math.floor(Math.random() * data.length);
        setSelectedBackground(data[randomIndex]);
        setBackground(data[randomIndex]?.image);
      })
      .catch((error) => {
        console.error("Error fetching backgrounds:", error);
      });
  }, []);

  const handleRandomBackground = () => {
    const randomIndex = Math.floor(Math.random() * backgrounds.length);
    setSelectedBackground(backgrounds[randomIndex]);
    setBackground(backgrounds[randomIndex]?.image);
  };

  return (
    <div className="background-info">
      {selectedBackground && (
        <Flex alignItems="center" gap='3'>
          <FaGlobeAmericas />
          <Text fontSize="lg">
            <Link
              href={selectedBackground.map}
              target="_blank"
              rel="noopener noreferrer"
            >
              {selectedBackground.country}
              {selectedBackground.region && `, ${selectedBackground.region}`}
            </Link>
          </Text>
          <IconButton
            aria-label="Random Background"
            onClick={handleRandomBackground}
            icon={<RepeatIcon />}
            size="sm"
            
          />
        </Flex>
      )}
    </div>
  );
};

export default Background;
