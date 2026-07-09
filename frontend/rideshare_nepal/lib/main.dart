import 'package:flutter/material.dart';

void main() {
  runApp(const CarpoolNepal());
}

class CarpoolNepal extends StatelessWidget {
  const CarpoolNepal({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Carpool Nepal',
      debugShowCheckedModeBanner: false,

      theme: ThemeData(
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xff2563EB),
        ),
        useMaterial3: true,
      ),

      home: const HomePage(),
    );
  }
}

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("Carpool Nepal"),
        centerTitle: true,
      ),

      body: const Center(
        child: Text(
          "Welcome to Carpool Nepal 🚗",
          style: TextStyle(
            fontSize: 30,
            fontWeight: FontWeight.bold,
          ),
        ),
      ),
    );
  }
}