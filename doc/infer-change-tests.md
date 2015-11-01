## Incremental Changes

For performance reasons, we can cache the state of the original text to allow
fast incremental, line-based changes.

Lines starting with `-` are replaced by those starting with `+`.

Inserting a new line:

```in
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
+  (let [result (* a b)]
      result)
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
   (let [result (* a b)]
      result))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

Inserting multiple new lines:

```in
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
+(defn prod [a b]
+  (let [result (* a b)]
+     result))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
   (let [result (* a b)]
      result))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

Replacing one line with another:

```in
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
-(defn prod [a b]
+(defn product [a b]
   (let [result (* a b)]
      result))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn product [a b]
   (let [result (* a b)]
      result))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

Replacing one line with many:

```in
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
   (let [result (* a b)]
-     result))
+     {:prod result
+      :a a
+      :b b}))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
   (let [result (* a b)]
      {:prod result
       :a a
       :b b}))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

Replacing many lines with one:

```in
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
-  (let [result (* a b)]
-     result))
+  (* a b))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
   (* a b))
 
 (defn frac [a b]
   (let [result (/ a b)]
      result))
```

Deleting many lines:

```in
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
   (let [result (* a b)]
-     result))
-
-
-(defn frac [a b]
+
   (let [result (/ a b)]
      result))
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
      result))
 
 (defn prod [a b]
   (let [result (* a b)])

   (let [result (/ a b)]
      result))
```

Affecting a previous insert point.

```in
 (defn sum [a b]
   (let [result (+ a b)]
     result))

 ; some comment

+  foo
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
     result)

 ; some comment

   foo)
```

Inserting blank lines should affect previous insert point.

```in
 (defn sum [a b]
   (let [result (+ a b)]
     result))

 ; some comment

+
+
+
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
     result))

 ; some comment

 
 
 
```

Affecting both previous insert point and subsequent stack

```in
 (defn sum [a b]
   (let [result (+ a b)]
     result))

-(defn prod [a b]
+ {:foo
   (let [result (* a b)]
     result))
```

```out
 (defn sum [a b]
   (let [result (+ a b)]
     result)

  {:foo
   (let [result (* a b)]
     result)})
```
