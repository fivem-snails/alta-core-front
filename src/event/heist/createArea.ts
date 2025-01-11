onNet(
  "Core/Client/Heist:CreateArea",
  (coords: TCoords, sprite: number, color: number, spawn: TSpawn, heist: any, license: string) => {
    const blip = AddBlipForRadius(coords.x, coords.y, coords.z, coords.r);
    SetBlipSprite(blip, sprite);
    SetBlipColour(blip, color);
    SetBlipAlpha(blip, 60);

    const localId = GetPlayerIndex();
    const src = GetPlayerServerId(localId);

    setTick(async () => {
      await delay(1000);

      const playerCoords = GetEntityCoords(PlayerPedId(), false);
      const distance = GetDistanceBetweenCoords(
        coords.x,
        coords.y,
        coords.z,
        playerCoords[0],
        playerCoords[1],
        playerCoords[2],
        true,
      );

      if (distance > coords.r) {
        SetTimecycleModifier("BloomMid");
        SetTimecycleModifierStrength(3.0);

        // setTimeout(() => {
        //   SetEntityCoords(
        //     PlayerPedId(),
        //     spawn.x,
        //     spawn.y,
        //     spawn.z,
        //     false,
        //     false,
        //     false,
        //     false,
        //   );

        //   return;
        // }, 6000);
      }

      if (distance < coords.r) {
        SetTimecycleModifier("Bloom");
        SetTimecycleModifierStrength(0.0);
      }
    });
  },
);
