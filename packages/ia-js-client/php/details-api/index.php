<?

// https://github.com/bkuhl/php-selector
require('./Dom.php');

class DetailsApi {
  /**
   * @return array (to be convert to json by caller)
   */
  function get($identifier) {
    if (!$identifier) {
      return ['error' => 'invalid identifier'];
    }

    $details_html = $this->fetch_details_response($identifier);

    $details_dom = new Dom($details_html);

    $response = [
      //'
      'jwInitData' => $this->jwInitData($details_html),
      'theatreMainImageUrl' => $this->theatreMainImageUrl($details_dom),
      'viewCount' => $this->viewCount($details_dom),
    ];
    if ($debug) {
      $response['raw_html'] = $details_html;
    }
    return $response;
  }

  private function jwInitData($details_html) {
    $match = null;
    // archive_setup.push(function() {
    // Play(

    // Regex to extract play argument
    $rg = '/Play\(\'jw6\',\s*(\[{.+}\])/s';
    $matches = [];

    preg_match_all($rg, $details_html, $matches, PREG_SET_ORDER, 0);
    // var_dump($matches);

    if (!empty($matches)) {
      $match = json_decode($matches[0][1]);
      // return array_map(function ($row) {
      //   return [$row[1], json_decode($row[2], 1)]; // ['loans', [ .. the patch ... ]]
      // }, $matches);
    }

    return $match;
  }

  private function theatreMainImageUrl($dom) {
    try {
      $els = $dom->find('#theatre-ia .audio-image-carousel-wrapper .img-responsive');
      return $els[0]['@attributes']['src'];
    } catch (Exception $e) {
      return null;
    }
  }

  private function viewCount($dom) {
    try {
      $els = $dom->find('.item-stats-summary__count');
      return (int)$els[0]['text'];
    } catch (Exception $e) {
      return null;
    }
  }

  /**
   * @return string
   */
  private function fetch_details_response($identifier) {
    return $this->get_page_content_with_cookies("http://archive.org/details/$identifier");
  }

  /**
   * @return string
   */
  public function get_page_content_with_cookies($url) {
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 10);
    curl_setopt($ch, CURLOPT_FOLLOWLOCATION, false);
    curl_setopt($ch, CURLOPT_HEADER, 1);

    // Forward current cookies to curl
    $cookies = array();
    foreach ($_COOKIE as $key => $value) {
      if ($key != 'Array') {
        $cookies[] = $key . '=' . $value;
      }
    }
    curl_setopt( $ch, CURLOPT_COOKIE, implode(';', $cookies) );

    $destination = $url;

    while ($destination) {
      session_write_close();
      curl_setopt($ch, CURLOPT_URL, $destination);
      $response = curl_exec($ch);
      $curl_info = curl_getinfo($ch);
      $destination = $curl_info["redirect_url"];
      session_start();
    }
    curl_close($ch);

    $headers = substr($response, 0, $curl_info["header_size"]);
    $body = substr($response, $curl_info["header_size"]);

    // // Extract cookies from curl and forward them to browser
    // preg_match_all('/^(Set-Cookie:\s*[^\n]*)$/mi', $headers, $cookies);
    // foreach($cookies[0] AS $cookie) {
    //     header($cookie, false);
    // }

    return $body;
  }
}

function main() {
  $detailsApi = new DetailsApi();
  $identifier = $_GET['identifier'] ?? null; ;
  $data = $detailsApi->get($identifier);

  if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
  }

  header('Access-Control-Allow-Origin: *');
  header('Content-type: text/json');
  echo json_encode($data);
}
main();
