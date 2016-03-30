<?php

$url = $_POST["url"];

echo json_encode([
	"success" => true,
	"url" => $url
]);