<?php

// namespace PHPSelector;

use InvalidArgumentException;
use DOMXpath;
use DOMDocument;

class Dom
{

    /**
     * @var \DOMDocument|null
     */
    protected $dom = null;

    /**
     * @var \DOMXpath|null
     */
    protected $xpath = null;

    /**
     * Map of regexes to convert CSS selector to XPath
     *
     * @var array
     */
    public static $regularExpressions = [

        // ,
        '/,/' => '|descendant-or-self::',

        // input:checked, :disabled, etc.
        '/(.+)?:(checked|disabled|required|autofocus)/' => '\1[@\2="\2"]',

        // input:autocomplete, :autocomplete
        '/(.+)?:(autocomplete)/' => '\1[@\2="on"]',

        // input:button, input:submit, etc.
        '/:(text|password|checkbox|radio|button|submit|reset|file|hidden|image|datetime|datetime-local|date|month|time|week|number|range|email|url|search|tel|color)/' => 'input[@type="\1"]',

        // foo[id]
        '/(\w+)\[([_\w-]+[_\w\d-]*)\]/' => '\1[@\2]',

        // [id]
        '/\[([_\w-]+[_\w\d-]*)\]/' => '*[@\1]',

        // foo[id=foo]
        '/\[([_\w-]+[_\w\d-]*)=[\'"]?(.*?)[\'"]?\]/' => '[@\1="\2"]',

        // [id=foo]
        '/^\[/' => '*[',

        // div#foo
        '/([_\w-]+[_\w\d-]*)\#([_\w-]+[_\w\d-]*)/' => '\1[@id="\2"]',

        // #foo
        '/\#([_\w-]+[_\w\d-]*)/' => '*[@id="\1"]',

        // div.foo
        '/([_\w-]+[_\w\d-]*)\.([_\w-]+[_\w\d-]*)/' => '\1[contains(concat(" ",@class," ")," \2 ")]',

        // .foo
        '/\.([_\w-]+[_\w\d-]*)/' => '*[contains(concat(" ",@class," ")," \1 ")]',

        // div:first-child
        '/([_\w-]+[_\w\d-]*):first-child/' => '*/\1[position()=1]',

        // div:last-child
        '/([_\w-]+[_\w\d-]*):last-child/' => '*/\1[position()=last()]',

        // :first-child
        '/:first-child/' => '*/*[position()=1]',

        // :last-child
        '/:last-child/' => '*/*[position()=last()]',

        // :nth-last-child
        '/:nth-last-child\((\d+)\)/' => '[position()=(last() - (\1 - 1))]',

        // div:nth-child
        '/([_\w-]+[_\w\d-]*):nth-child\((\d+)\)/' => '*/*[position()=\2 and self::\1]',

        // :nth-child
        '/:nth-child\((\d+)\)/' => '*/*[position()=\1]',

        // :contains(Foo)
        '/([_\w-]+[_\w\d-]*):contains\((.*?)\)/' => '\1[contains(string(.),"\2")]',

        // >
        '/>/' => '/',

        // ~
        '/~/' => '/following-sibling::',

        // +
        '/\+([_\w-]+[_\w\d-]*)/' => '/following-sibling::\1[position()=1]',
        '~\]\*~' => ']',
        '~\]/\*~' => ']',

    ];

    /**
     * QParser constructor.
     * @param $html string|\DOMDocument|null
     */
    public function __construct($html = null)
    {
        if ($html) {
            $this->load($html);
        }
    }

    /**
     * @param $html string|\DOMDocument
     */
    public function load($html)
    {

        if (is_string($html)) {

            if (file_exists($html)) {
                $html = file_get_contents($html);
            }

            $this->dom = new DOMDocument();
            ob_start();
            $this->dom->loadHTML('<?xml encoding="UTF-8">' . $html);
            ob_get_clean();
        }
        else if ($html instanceof DOMDocument) {
            $this->dom = $html;
        }
        else {
            throw new InvalidArgumentException(__FUNCTION__);
        }

        $this->xpath = new DOMXpath($this->dom);

    }

    /**
     * @param $selector
     * @param bool $asArray
     * @return array|mixed
     */
    public function find(string $selector, bool $asArray = true)
    {
        $elements = $this->xpath->evaluate($this->toXPath($selector));
        if ($asArray) {
            return $this->toArray($elements);
        }
        return $elements;
    }

    /**
     * Convert $selector into an XPath string.
     */
    protected function toXPath(string $selector) : string
    {

        if (empty($selector)) {
            throw new InvalidArgumentException(__FUNCTION__);
        }

        // remove spaces around operators
        $selector = preg_replace('/\s*([>~,+])\s*/', '$1', $selector);
        $selectors = preg_split("/\s+(?![^\[]+\])/", $selector);

        # Process all regular expressions to convert selector to XPath
        foreach ($selectors as &$selector) {
            foreach (self::$regularExpressions as $find => $replace) {
                $selector = preg_replace($find, $replace, $selector);
            }
        }

        // ' '
        $selector = implode('/descendant::', $selectors);
        $selector = 'descendant-or-self::' . $selector;

        // :scope
        $selector = preg_replace('/(((\|)?descendant-or-self::):scope)/', '.\3', $selector);

        // $element
        $sub_selectors = explode(',', $selector);

        foreach ($sub_selectors as $key => $sub_selector) {
            $parts = explode('$', $sub_selector);
            $sub_selector = array_shift($parts);

            if (count($parts) && preg_match_all('/((?:[^\/]*\/?\/?)|$)/', $parts[0], $matches)) {
                $results = $matches[0];
                $results[] = str_repeat('/..', count($results) - 2);
                $sub_selector .= implode('', $results);
            }

            $sub_selectors[$key] = $sub_selector;
        }

        return implode(',', $sub_selectors);

    }

    /**
     * Convert $element||$elements to an array.
     *
     * @param $element \DOMNodeList|\DOMNode
     */
    protected function toArray($element) : array
    {

        if (isset($element->nodeName)) {

            $array = [
                'name' => $element->nodeName,
                '@attributes' => [],
                'text' => $element->textContent,
                'children' => $this->toArray($element->childNodes)
            ];

            if ($element->attributes->length) {
                foreach ($element->attributes as $key => $attr) {
                    $array['@attributes'][$key] = $attr->value;
                }
            }

            return $array;

        }

        $array = [];
        for ($i = 0, $length = $element->length; $i < $length; ++$i) {
            $item = $element->item($i);
            if (XML_ELEMENT_NODE === $item->nodeType) {
                $array[] = $this->toArray($item);
            }
        }

        return $array;

    }


}